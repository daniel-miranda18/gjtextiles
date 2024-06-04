<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Filament\Resources\OrderResource\RelationManagers\OrderDetailsRelationManager;
use App\Models\Order;
use App\Models\User;
use App\Models\Payment;
use App\Models\Shipping;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;
use Carbon\Carbon;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube';

    protected static ?string $label = 'Pedidos';

    protected static ?string $navigationGroup = 'Pedidos, Pagos & Envios';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                ->label('Cliente')
                ->options(User::all()->pluck('name', 'id'))
                ->disabled()
                ->required(),
            Forms\Components\Select::make('payment_id')
                ->label('Método de Pago')
                ->options(Payment::all()->pluck('payment_method', 'id'))
                ->disabled()
                ->required(),
            Forms\Components\Select::make('shipping_id')
                ->label('Método de Envío')
                ->options(Shipping::all()->pluck('name', 'id'))
                ->disabled()
                ->required(),
            Forms\Components\TextInput::make('currency')
                ->label('Moneda')
                ->disabled() 
                ->required()
                ->maxLength(255),
            Forms\Components\TextInput::make('total_amount')
                ->label('Total')
                ->disabled()
                ->required()
                ->numeric(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Cliente')
                    ->sortable(),
                Tables\Columns\TextColumn::make('payment.payment_method')
                    ->label('Método de Pago')
                    ->sortable(),
                Tables\Columns\TextColumn::make('shipping.name')
                    ->label('Método de Envío')
                    ->sortable(),
                Tables\Columns\TextColumn::make('total_amount')
                    ->label('Monto')
                    ->sortable(),
                Tables\Columns\TextColumn::make('currency')
                    ->label('Moneda')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Fecha de Pago')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                DateRangeFilter::make('created_at')->startDate(Carbon::now())->endDate(Carbon::now())
                    ->label('Pedidos Hasta')
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->label('Ver'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            OrderDetailsRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'view' => Pages\ViewOrder::route('/{record}'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}