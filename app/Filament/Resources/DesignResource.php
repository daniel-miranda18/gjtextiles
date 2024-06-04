<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DesignResource\Pages;
use App\Filament\Resources\DesignResource\RelationManagers;
use App\Models\Design;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Select;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Filters\QueryBuilder;
use Filament\Tables\Filters\QueryBuilder\Constraints\BooleanConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\DateConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\NumberConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\RelationshipConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\RelationshipConstraint\Operators\IsRelatedToOperator;
use Filament\Tables\Filters\QueryBuilder\Constraints\SelectConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\TextConstraint;

class DesignResource extends Resource
{
    protected static ?string $model = Design::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $label = 'Diseños';

    protected static ?string $navigationGroup = 'Productos';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nombre')
                    ->maxLength(100)
                    ->default('')
                    ->required(),
                Forms\Components\TextInput::make('price')
                    ->label('Precio')
                    ->numeric()
                    ->default(1)
                    ->prefix('Bs. ')
                    ->required()
                    ->rules('min:0'),
                Forms\Components\FileUpload::make('image')
                    ->label('Imagen')
                    ->image()
                    ->required(),
                Select::make('technique')
                    ->label('Técnica')
                    ->options([
                        'SUBLIMACIÓN' => 'SUBLIMACIÓN',
                        'SERIGRAFÍA' => 'SERIGRAFÍA',
                        'BORDADO' => 'BORDADO'
                    ])
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nombre')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->label('Precio')
                    ->prefix('Bs.  ')
                    ->sortable(),
                Tables\Columns\ImageColumn::make('image')
                    ->label('Imagen'),
                Tables\Columns\TextColumn::make('technique')
                    ->label('Técnica')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('createdBy.name')
                    ->label('Creado Por')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('updatedBy.name')
                    ->label('Editado Por')
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Fecha de Creación')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Fecha de Actualización')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()->modalHeading('Borrar Diseño'),
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
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDesigns::route('/'),
            'create' => Pages\CreateDesign::route('/create'),
            'edit' => Pages\EditDesign::route('/{record}/edit'),
        ];
    }
}
